# Web Scraping Guide

Web scraping is the automated process of extracting information from websites. This guide walks you through the basics of how it works, tools to use, and best practices.

## 🧠 What is Web Scraping?

Web scraping involves writing code that:

1. Sends a request to a website.
2. Downloads the HTML content of the page.
3. Parses the HTML to extract the desired data.
4. Stores the data in a structured format (CSV, JSON, database, etc.).

## 🛠️ Tools & Libraries

### Python Libraries

- `requests` – to send HTTP requests
- `BeautifulSoup` – to parse HTML and XML documents
- `lxml` – a fast XML/HTML parser
- `Selenium` – automates browsers (good for JavaScript-heavy pages)
- `Scrapy` – a powerful web scraping framework

## 🧪 Example: Basic Scraper Using Python

```python
import requests
from bs4 import BeautifulSoup

# Step 1: Send request
url = "https://example.com"
response = requests.get(url)

# Step 2: Parse HTML
soup = BeautifulSoup(response.text, "html.parser")

# Step 3: Extract data
titles = soup.find_all("h2")
for title in titles:
    print(title.text)
```

## ✅ Best Practices

- Respect `robots.txt` to know what’s allowed to scrape.
- Limit request frequency to avoid overloading servers (use `time.sleep()`).
- Use user-agent headers to simulate real browser requests.
- Avoid scraping behind login walls unless authorized.
- Cache or store responses if you need to scrape frequently.

## ⚖️ Legal & Ethical Considerations

- **Always** check a website’s Terms of Service.
- Web scraping may be against the rules for some sites.
- Data collected should be used responsibly.
- Don’t scrape personal data without consent.

## 📚 Further Learning

- [Scrapy Documentation](https://docs.scrapy.org/en/latest/)
- [BeautifulSoup Docs](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Real Python: Web Scraping](https://realpython.com/beautiful-soup-web-scraper-python/)

## 🔚 Conclusion

Web scraping is a powerful tool for automating data collection from the web. With proper technique and ethics, you can build anything from price trackers to research datasets.
