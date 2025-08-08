import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
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
            width: "48px",
            height: "48px",
            borderRadius: "0px", 
            backgroundColor: "#E60028",
            color: "#fff",
            zIndex: 3000,
            minHeight: "unset", 
            "&:hover": {
              backgroundColor: "#C40023",
            },
          }}
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      )}
    </>
  );
}
