import React from "react";

const Footer = () => {
  return (
    <footer className=" text-gray-300 p-6 text-center mt-5">
      <h2 className="text-xl font-bold mb-2">SlateFlix</h2>
      <p className="mb-2">
        <a
          href="mailto:kateykwesi@outlook.com"
          className="underline hover:text-white"
        >
          contact@slateflix.com
        </a>
      </p>
      <p className="mb-2 text-sm text-gray-400">
        We don’t store any media on our servers. All content is linked from
        trusted third-party sources. Any legal concerns or copyright issues
        should be directed to the respective content owners or hosting
        platforms.
      </p>
      <p className="mt-4 text-sm text-gray-400">
        © {new Date().getFullYear()} SlateFlix. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
