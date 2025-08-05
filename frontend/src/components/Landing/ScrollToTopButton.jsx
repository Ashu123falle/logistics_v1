import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100); // show only after scrolling
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {show && (
        <Fab
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "black",
            color: "red",
            border:"1px solid white",
            zIndex: 3000, // on top of everything
            "&:hover": { backgroundColor: "#333" }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </>
  );
}
