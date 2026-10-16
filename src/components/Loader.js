import React, { useEffect } from 'react';

// Full-screen fade loader: removed once the page has finished loading.
export default function Loader() {
  useEffect(() => {
    const done = () => document.body.classList.add('page-loaded');
    if (document.readyState === 'complete') {
      const t = setTimeout(done, 400);
      return () => clearTimeout(t);
    }
    window.addEventListener('load', done);
    return () => window.removeEventListener('load', done);
  }, []);

  return (
    <div id="page-loader">
      <div className="loader" />
    </div>
  );
}
