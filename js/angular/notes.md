# Angular Notes

## Project Structure

Key files in a minimal Angular workspace:

- `src/main.ts` - Boots the app with bootstrapApplication.
- `src/app/app.component.ts` - Root component (if used). You can also define the root inline in main.ts.
- `src/app/` - Where you add your components and features.
- `src/index.html` - Host page that contains `<app-root>`.
- `src/styles.css` - Global styles for the app.
- `angular.json` - Angular workspace configuration (build, serve, test).
- `package.json` - Scripts and dependencies.

## Angular Templates

- Templates are the HTML that a component renders.
- Templates combine plain HTML with Angular template syntax to show data and react to user events.

### How templates work

1. **Initial render**: Angular creates the component and processes the template, wiring bindings between the DOM and component fields.
2. **Change detection**: On user events, timers, or async work, Angular re-evaluates template expressions and updates only what changed.
3. **Directives**: Create/destroy embedded views (DOM fragments) based on state.
4. **Binding flow**: Interpolation/Property binding push data to the view. Event binding captures browser events back to the component.

### Templates Overview

Explore templates step by step in these next chapters:

- Interpolation - show values with `{{ ... }}`.
- Template Reference Variables - use `#var` to reference elements.
- Null-Safe Navigation (`?.`) - read optional values safely.
- Structural Directives: Micro-syntax - the `*` shorthand.
- ngTemplateOutlet - render a template by reference.
- Template Statements and `$event` - handle events and inputs.
- Alias with as in `*ngIf` - create local aliases.
- Pipes in Templates (`|`) - format and transform values.
- Attribute Binding with `attr.` - bind to HTML attributes.
- TrackBy with `*ngFor` - keep lists fast and stable.

## Angular Component

- A component is a class that controls a view (its template).
- Each component has a selector (e.g., app-root) that you place in HTML.
- The root component renders inside index.html's `<app-root>`.
