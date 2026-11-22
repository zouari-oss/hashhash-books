# Jar

## What is jar?

JAR (Java Archive) is a platform-independent file format that aggregates many files into one. It's based on the ZIP file format and is used for bundling Java class files, resources, and metadata into a single file for easier distribution and deployment.

## Actions

```sh
jar cf jarfilename inputfiles # Create a JAR file
jar tf jarfilename            # View a JAR file
jar xf jarfilename            # Extracting a JAR file
jar uf jar-file input-file(s) # Updating a JAR File
java -jar pack.jar            # Running a JAR file
```
