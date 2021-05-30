## **What is the problem?**
When I first started developing Angular apps, I didn't really understand rxjs.  The only time I really used observables is when I needed to make an HTTP call and in that case I would just subscribe to the response and update properties in my component to reflect changes to the user.  Now that I have learned the power of rxjs, I see some of the pitfalls of simply subscribing in components.  I have enumerated some of those pitfalls below:

1.) Introduce memory leaks.
- Subscriptions must be completed otherwise memory leaks occur.  Some subscriptions complete automatically (an HTTP call for instance).  However, some must be explicitly completed.  When we use rxjs and async pipe in our template, Angular handles completing the subscription for us.

2.) Nested subscriptions.  I have seen many code bases that have nested subscriptions where a component subscribes to an observable and inside that subscription, subscribes to another observable (remember callback hell anyone).

3.) Coupling of business logic with presentational logic. 

4.) Usually in this pattern, we create some public properties that is updated inside of the subscription which will be used by the template.

5.) Cannot use on push change detection strategy.
- This is because we mutate the state of the component by updating it's properties in the subscriptions.  This makes Angular fire the on changes lifecycle hook every time the component changes and not just when an input to a child component changes.

**Scenario:**
To go through my evolution of learning rxjs, I created a [Stackblitz](https://stackblitz.com/edit/angular-ivy-9e1jza).  Here is our scenario:
We want to take a poll of the best players in the history of the NBA at every position.  To do this, we need to:

 - Call an http service to fetch all players that are available to be voted for.
 - Load details for each player such as nickname and specialty.
	 - **Note:** I know it is probably not the best implementation to fetch all players and also fetch the player details in a separate call on initial page load, but this scenario illustrates a scenario with nested subscribes.
	 - Each player will have a "Like" link which increments when the link is clicked.
	 - When we click on a player, we want to display a side panel to show the player details.
	 - We also have an auto complete control that will filter the positions to show based on the filter value of the control.

## Let's look at the the code below in the way I would implement this early in my career:

 - **subscribes.component.html**
 ![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/68eqyjun9iu9b83lwgow.png)

 - **subscribes.component.ts**
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rhksuhrtrzfpbtv21hgr.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ct2gzuyym2i5cjg06ll9.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/glez8917lqorlx03li67.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7fn1ak2cziz8o7aedvto.png)
**Things to Note**
 - We have a template the binds to properties that exist on the component
 - All the business logic that updates properties lives inside the component
	 - This means that we may not be able to use the change detection strategy OnPush in our child components because the we do not use immutable properties in the component.
	 - If we need to implement this screen in a different form factor (mobile view for example), we will need to recreate the same logic in the new component.
 - We need to remember to complete the subscription we create in the component.

## Let's do it now with Behavior Subjects

 - **behavior-subject.component.html**
 ![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4io8mpwnr2l68o53b3of.png)

- **behavior-subject.component.ts**
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0nuhg1rysqxjjn4k9nd2.png)

- **behavior-subject-state.service.ts**
![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tdpuwh74zpdsrekiyqdd.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/78y357iedi2fr3b2rlgb.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8opywnx4vok0h8m2l8j0.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/96jw4ffoj11mw3gldlvy.png)

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vmj2p7zolhe6nq2vud2w.png)

**Things to Note:**

 - We created an observable property in the component that contains all of the properties that are needed in the component.  These are the properties that previously lived in the component itself.
 - We inject a newly created service that will manage the state of the data for our component.
 - We provide the service in the component declaration.  This means that the service instance only exists in the context of this component.  This means that if we have another component instance that in the state of the application, the service is localized to the component instance.
- We create an observable to listen for changes in our form where we call our service to trigger an update when we need changes reflected in the component.  We use rxjs's ignoreElements operator so we can merge this with the view model from the view model returned from the service.
 - In our HTML template, we use async pipe to bind from the observable property in the component.
	 - This separates the logic between the presentational component and the logic for the data that populates the component.  
	 - This allows us to create a new component that utilizes the same data (ie: a mobile responsive component) to reuse the same logic to orchestrate the data for the screen.
	 - We also do not need to complete the subscription of the the observable since Angular handles this on the teardown of the component.
	 - This also allows us to use Angular's change detection for child components since when the state of the data changes, we create a clone of the previous property with updated values.
	 - It also gives us better testability in that we can mock our injected service and call methods on that mock to update the state of the data.

## Summary
Going with this pattern for components make for a clear separation of concerns between presentational components and the business logic to populate the data for the component.  The functional nature of this pattern also makes for more testable code.  Finally, the functional aspect of the component allows us to use Angular's on push change detection for the child components.  Having public properties in a component that are constantly updated make for buggy behavior when using on push in child components.  Being able to use on push is a performance boost since we don't need to constantly check child components' on change lifecycle hook.

