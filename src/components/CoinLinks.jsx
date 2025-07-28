import React from 'react';
import './CoinLinks.css';

const CoinLinks = ({ coin }) => {
  if (!coin || !coin.links) return null;

  const {
    homepage,
    official_forum_url,
    twitter_screen_name,
    subreddit_url,
    repos_url,
  } = coin.links;

  const links = [
    { label: '🌐 Website', url: homepage[0] },
    { label: '💬 Forum', url: official_forum_url[0] },
    { label: '🐦 Twitter', url: twitter_screen_name ? `https://twitter.com/${twitter_screen_name}` : null },
    { label: '👾 Reddit', url: subreddit_url },
    { label: '💻 GitHub', url: repos_url?.github[0] },
  ];

  const filteredLinks = links.filter(link => link.url);

  return (
    <div className="coin-links-container">
      <h3 className="coin-links-heading">🔗 Official Links</h3>
      <div className="coin-links-wrapper">
        {filteredLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="coin-link"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CoinLinks;
