import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ChatBotView from "./view";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const ChatBot = () => {
  const scriptTag = document.querySelector("script[data-agent-id]");
  const chatbotId = scriptTag ? scriptTag.dataset.agentId : null;

  let lastItemRef = useRef(null);
  let boxRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [threadId, setThreadId] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedChatResponse, setselectedChatResponse] = useState();

  const handleChatOpen = () => {
    setOpenChat(true);
  };

  const handleChatClose = () => {
    setOpenChat(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCopy = (index) => {
    setCopied(true);
    setselectedChatResponse(index);
  };

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // Scroll to the end of the container
        inline: "nearest", // Align the last message to the nearest side
      });
    }
  }, [chatMessages]);

  const handleResizeW = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    handleResizeW();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const applyStyles = (element, item) => {
    if (
      element.tagName === "H1" ||
      element.tagName === "H2" ||
      element.tagName === "H3"
    ) {
      element.style.fontSize = isMobile ? "1rem" : "1.1rem";
      element.style.fontFamily = "Outfit";
      element.style.overflow = "hidden";
      element.style.color = "#1B2559";
      element.style.width = "100%";
      element.style.whiteSpace = "pre-line";
      element.style.marginTop = "2px";
      element.style.marginBottom = "3px";
      // element.style.width = "98%";
    } else if (
      element.tagName === "P" ||
      element.tagName === "LI" ||
      element.tagName === "PRE" ||
      element.tagName === "H"
    ) {
      // element.style.fontSize = '20px';
      element.style.color = "#1B2559";
      element.style.width = "100%";
      element.style.marginTop = "1px";
      element.style.fontFamily = "Outfit";
      element.style.marginBottom = "10px";
      element.style.fontSize =
        viewportHeight < 750 || isMobile ? "0.84rem" : "1rem";
    } else if (element.tagName === "IMG") {
      // Create a container div for the image
      const imgContainer = document.createElement("div");
      imgContainer.style.width = "100%"; // Set the container width to 100%
      imgContainer.style.textAlign = "left"; // Align the image to the left
      // imgContainer.style.marginTop = "10px";
      imgContainer.style.marginBottom = "10px";
      imgContainer.style.display = "inline-block"; // Display as inline-block
      // Create an image element and set its width to 100%
      const imgElement = document.createElement("img");
      imgElement.src = element.src;
      imgElement.style.width =
        item?.links?.length > 0 ? "80px" : isMobile ? "70%" : "45%"; // Set the image width to 100%
      imgElement.style.height = "auto"; // Maintain aspect ratio
      imgElement.style.marginTop = "6px";
      imgElement.style.marginBottom = "5px";
      imgElement.style.borderRadius = "10px";

      // Append the image to the container and the container to the parent
      imgContainer.appendChild(imgElement);
      element.parentNode.replaceChild(imgContainer, element);
    }
  };

  const createMarkup = (item, html) => {
    const container = document.createElement("div");
    container.innerHTML = html;

    const elements = container.querySelectorAll("h1, h2, p,h3,li,img", "pre");

    elements.forEach((element) => {
      applyStyles(element, item);
    });

    return { __html: container.innerHTML };
  };

  const sendMessage = async (e) => {
    try {
      console.log("clicked");
      e.preventDefault();
      if (inputValue?.length > 0) {
        setIsLoading(true);

        const messageObject = {
          role: "user",
          content: inputValue,
          thread_id: threadId ? threadId : "",
        };

        setChatMessages((prevResults) => [...prevResults, messageObject]);
        setInputValue("");

        const res = await axios({
          method: "post",
          url: "https://fluenttalkai.com/chat/chat",
          data: messageObject,
          headers: {
            Authorization: chatbotId,
          },
        })
          .then(function (response) {
            //handle success
            if (response?.data?.status === 200) {
              const obj = {
                role: "assistant",
                content: response?.data?.content,
              };
              setThreadId(response?.data?.thread_id);
              setChatMessages((prevResults) => [...prevResults, obj]);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              enqueueSnackbar(`Error`, {
                autoHideDuration: 3000,
                variant: "error",
              });
            }
          })
          .catch(function (response) {
            //handle error
            console.log(response);
            setIsLoading(false);
          });
      } else {
        if (inputValue === "") {
          enqueueSnackbar(`Please enter message to send `, {
            autoHideDuration: 3000,
            variant: "warning",
          });
        }
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const chatbotProps = {
    openChat,
    handleChatClose,
    handleChatOpen,
    handleInputChange,
    inputValue,
    chatMessages,
    lastItemRef,
    boxRef,
    handleCopy,
    selectedChatResponse,
    createMarkup,
    sendMessage,
    isLoading,
  };

  return <ChatBotView {...chatbotProps} />;
};

export default ChatBot;
