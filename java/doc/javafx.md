# JavaFx

## FXML

- FXML lets you _describe_ and _configure_ your scene graph in a declarative format.
- This approach has several advantages:
  - FXML markup structure is hierarchical, so it reflects the structure of your scene graph.
  - FXML **describes your view** and **supports a Model-View-Controller (MVC) architecture**, providing better structure for larger applications.
  - FXML reduces the JavaFX code you have to write to create and configure scene graph nodes.
  - You can design your UI with Scene Builder. This drag-and-drop tool is a stand-alone application that provides a visual rendering of your scene. And Scene Builder generates the FXML markup for you.
  - You can also edit your FXML markup with text and IDE editors.

> [!NOTE]
> The top-level container includes the name of the JavaFX controller class with attribute `fx:controller`.

## JavaFX FXML controller

### Constructor vs initialize method

```java
public class MainViewController {
  public MainViewController() {
    System.out.println("first");
  }

  @FXML
  public void initialize() {
    System.out.println("second");
  }
}
// Output
// first
// second
```

- The constructor is called first, then any `@FXML` annotated fields are populated, then `initialize()` is called.
- This means the constructor does **not have access to `@FXML`** fields referring to components defined in the `.fxml` file, while `initialize()` does have access to them.

## JavaFX Pop-up's

- **Popup**:
  Ideal for simple, non-modal overlays like tooltips, context menus, or transient notifications.
- **Alert**:
  Suitable for standard, modal alert messages (information, warning, error, confirmation).
- **Dialog**:
  Use for creating complex, custom-designed modal dialogs that require user input or specific interactions.

## javafx ResourceBundle

- In JavaFX, `ResourceBundle` is primarily used for **internationalization (I18n)** and **localization (L10n)** of applications. It allows you to store locale-specific data, such as text messages, images, or other resources, in separate files, making it easy to adapt your application for **different languages and regions without modifying the core code**.

- Here's how ResourceBundle is utilized in JavaFX:
  - Creating Resource Bundles:
    - Resource bundles are typically implemented as `.properties` files (or XML-based properties files) containing key-value pairs.
    - Each file represents a specific locale, named with a base name and a locale suffix (e.g., `Bundle.properties` for the default locale, `Bundle_fr.properties` for French).
  - Accessing Resources in FXML:
    - You can reference resource keys directly within your FXML files using the `%` prefix (e.g., `text="%button.text"`).
    - When the FXML is loaded by FXMLLoader, it automatically resolves these keys against the provided ResourceBundle.
  - Loading with FXMLLoader:
    - To use `ResourceBundle` with FXML, you provide the bundle to the `FXMLLoader` instance using the `setResources()` method or by passing it to the `FXMLLoader` constructor.
    - This ensures that all resource keys within the loaded FXML are resolved using the specified bundle.
  - Dynamic Language Switching:
    By changing the `ResourceBundle` associated with the `FXMLLoader` and reloading the FXML, you can dynamically switch the application's language at runtime.
- Example:

  ```java
  import javafx.fxml.FXMLLoader;
  import java.util.Locale;
  import java.util.ResourceBundle;

  public class MyController {

      public void initialize() {
          // Load a specific resource bundle
          ResourceBundle bundle = ResourceBundle.getBundle("bundles.MyBundle", new Locale("en", "US"));

          // Create an FXMLLoader and set the resource bundle
          FXMLLoader loader = new FXMLLoader(getClass().getResource("my_view.fxml"));
          loader.setResources(bundle);

          // Load the FXML
          // Parent root = loader.load();
          // ...
      }
  }
  ```

## JavaFx Mobile Dev

You can create a basic JavaFX project from a Maven archetype using the following command:

```bash
mvn -B \ # Batch mode (without prompting the user for input during the build or generation process)
    archetype:generate \
    -DarchetypeGroupId=com.gluonhq \
    -DarchetypeArtifactId=gluonfx-archetype-javafx \
    -DarchetypeVersion=0.0.3 \
    -DgroupId=com.gluonhq \
    -DartifactId=gluon-client-sample \
    -Dversion=1.0.0-SNAPSHOT
```
