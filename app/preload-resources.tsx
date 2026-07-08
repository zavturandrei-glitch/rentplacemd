"use client";

import ReactDOM from "react-dom";

export default function PreloadResources() {
  ReactDOM.preload("/main.jpg", {
    as: "image",
    fetchPriority: "high",
  });

  return null;
}
