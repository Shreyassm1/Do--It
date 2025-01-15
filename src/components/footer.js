import React, { useEffect, useState } from "react";
import "./footer.css";

const Footer = () => {
  const [quoteData, setQuoteData] = useState({
    quote: "Fetching new quote...",
    author: "",
  });

  const fetchQuote = async () => {
    const apiUrl = "https://api.api-ninjas.com/v1/quotes";
    const apiKey = process.env.REACT_APP_API_KEY; //must start with REACT_APP_
    console.log(apiKey);

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.length > 0) {
        setQuoteData(data[0]);
      } else {
        setQuoteData({
          quote: "No quote available at the moment.",
          author: "",
        });
      }
    } catch (error) {
      setQuoteData({
        quote: "An error occurred while fetching the quote.",
        author: "",
      });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const { quote, author } = quoteData;

  return (
    <div className="bg-box">
      <div className="footer-content">
        <div className="footer-quotes">{quote}</div>
        <div className="footer-credits">{author}</div>
      </div>
    </div>
  );
};

export default Footer;
