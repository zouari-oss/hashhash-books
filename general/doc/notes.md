# Notes

- A database contains related data in an electronic format. The relational database is the most common type. Data in a relational database is stored in tables with rows (records) and columns (fields).
- A record contains specific data, like information about a particular employee, customer or a product.
- A field contains data about one aspect of the table subject, such as first name or e-mail address.
- The most efficient and flexible way to access structured data is the relational database model. A relational database can contain several tables. The different tables are connected by one or more common fields called keys. Key fields connecting tables might appear with different names in different tables but they refer to the same aspect of the data.
- A visual representation of a database is called **schema**. The schema diagram describes how a database is organized and it includes:
  - Number and name of the tables in the database
  - Fields in each table
  - Keys connecting related tables
- Retrieving data from a database is known as **querying.**
- **Relational databases** organize and store structured data into **records** and **fields**
- Different tables in a relational database connect to each other with **key** **fields**
- **SQL** is the standardized **query** **language** to extract data from relational databases.
- The data analysis process defines the 5 steps required to analyze data:  - Ask the right questions - Collect the data - Clean the data - Explore data to finding patterns and insights - Communicate and present results.
  ![[Pasted image 20240601015155.png]]
- Servers are databases that are always connected to the Internet. You can use an Application Programming Interface (API) to request information from servers. Web APIs open a door to data from a third party platform over the Internet. There are APIs for Facebook, Youtube, Wikipedia and pretty much every other platform.
  ![[Pasted image 20240601015942.png]]
- Data rarely comes in ready for analysis. Raw data is often messy and dirty. Some of the most common problems with data are:
- Missing values
- Duplicates
- Incorrect data type
- Handling anomalous and extreme values (also called **outliers**)
  ![[Pasted image 20240601020238.png]]
  ⭐ Data analysis is required to turn raw data into insights.
  ⭐ The data analysis process consists of 5 steps.

## Careers in data

![[Pasted image 20240602231733.png]]

- Data has never been more popular. Here are some of the reasons:
  - **Rapid growth:** The data industry has grown rapidly in recent years.
  - **Talent shortage:** Companies are having difficulties finding the right talent to make sense of data.
  - **Data analysis is fun:** A daily life as a data professional is full of fun intellectual challenges, from coding to analyzing interesting datasets.
  - **Salary expectations:** Data professionals are among the best-paid workers in the digital economy.
- Data Analysts are responsible for collecting, cleaning and preparing data for analyzes. They have a deep understanding of the data analysis process. They also report insights in order to solve specific business problems.
- Anyone interested in becoming a data analyst should pick up some database interrogation skills (SQL) and learn a programming language like Python.
- Big Data is usually associated with the terms AI and Machine Learning: - AI stands for Artificial Intelligence (sometimes Augmented Intelligence) and refers to machines that behave in ways that, until recently, we thought required human intelligence. - Machine Learning is a type of AI that learns from data to make predictions.
  ![[Pasted image 20240602232254.png]]
- Coding skills are required for the technical data roles you learned about. There are also plenty of opportunities for people from non-tech backgrounds: - Data product manager - Data strategy consultant - Data ethicist - Technical writer
  ⭐ The data science industry is growing quickly. There are opportunities for everyon.
  ⭐ Most of the technical roles require a solid understanding of coding and statistics.
  ⭐ Other non-technical positions are a great way to break into the industry.

## Bitwise Not Operator

- General formula: `~n = -(n + 1)`

## Functions vs. methods

- A method is a specific kind of function ‒ it behaves like a function and looks like a function, but differs in the way in which it acts, and in its invocation style.
- A function doesn't belong to any data ‒ it gets data, it may create new data and it (generally) produces a result.
- A method does all these things, but is also able to change the state of a selected entity.
- A method is owned by the data it works for, while a function is owned by the whole code.
- This also means that invoking a method requires some specification of the data from which the method is invoked.
- It may sound puzzling here, but we'll deal with it in depth when we delve into object-oriented programming.
- In general, a typical function invocation may look like this:
  `result = function(arg)`
- he function takes an argument, does something, and returns a result. A typical method invocation usually looks like this:
  `result = data.method(arg)`
- **Note**: the name of the method is preceded by the name of the data which owns the method. Next, you add a dot, followed by the method name, and a pair of parenthesis enclosing the arguments.
- The method will behave like a function, but can do something more ‒ it can change the internal state of the data from which it has been invoked.

## Naming Conventions

| Case Type       | Format Example  | Description                                       | Common Use Cases                            |
| --------------- | --------------- | ------------------------------------------------- | ------------------------------------------- |
| **Kebab Case**  | `fun-fun-games` | Lowercase words separated by **dashes (-)**       | GitHub repo names, URLs, CSS classes        |
| **Pascal Case** | `FunFunGames`   | Each word capitalized and joined without space    | Class names in C#, Java, React components   |
| **Snake Case**  | `fun_fun_games` | Lowercase words separated by **underscores (\_)** | Python variables, filenames, some APIs      |
| **Camel Case**  | `funFunGames`   | Like Pascal, but the first word is lowercase      | JavaScript variables/functions, Java fields |

### When to Use Each

- Kebab Case
  - Best for: GitHub repo names, URLs, CSS classes
  - Reason: Easy to read, URL-friendly, widely accepted on web
- Pascal Case
  - Best for: Class names, component names, namespaces
  - Reason: Clear word boundaries, common in many OOP languages
- Snake Case
  - Best for: Python variables, constants, config files
  - Reason: Easy to type and read in scripts, widely adopted in Python community
- Camel Case
  - Best for: Variable and function names in JavaScript, Java, C#
  - Reason: Keeps names concise and readable while distinguishing words
