import React from "react";

const Footer = () => {
  return (
    <footer className=" text-gray-300 p-6 text-center mt-50">
      <h2 className="text-xl font-bold mb-2">SlateFlix</h2>
      <p className="mb-2">
        We don’t store any media on our servers — all content is linked from
        trusted third-party sources.
      </p>
      <p className="mb-2">
        📧
        <a
          href="mailto:contact@slateflix.com"
          className="underline hover:text-white"
        >
          contact@slateflix.com
        </a>
      </p>
      <p className="mb-2 text-sm text-gray-400">
        Any copyright or other violations should be reported to the respective
        content owners.
      </p>
      <p className="mt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SlateFlix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
