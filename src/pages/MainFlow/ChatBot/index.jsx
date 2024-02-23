import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ChatBotView from "./view";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const ChatBot = () => {
  let lastItemRef = useRef(null);
  let boxRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([
    // {
    //   role: "user",
    //   content: "Hello",
    // },
    // {
    //   role: "assistant",
    //   content: `
    //   <!DOCTYPE html><html> <head>  <title>   How to Start a Music Career  </title> </head> <body>  <h1>   How to Start a Music Career  </h1>  <p>   To start your music career, you need to:  </p>  <ol>   <li>    Define your goals. What do you want to achieve as a musician? Do you want to be a solo artist, join a band, or become a songwriter or producer? Once you know what you want, you can start to develop a plan to achieve it.    <a href=\"https://soundcamps.com/blog/how-to-start-a-music-career/\" target=\"_blank\">     <img alt=\"Music career goals\" src=\"https://blog.discmakers.com/wp-content/uploads/2015/01/Smart-Goals-Social.jpg\"/>    </a>   </li>   <li>    Develop your skills. This includes practicing your instrument or singing voice, learning music theory, and songwriting. You may also want to take lessons from a qualified instructor.    <a href=\"https://d4musicmarketing.com/start-music-career/\" target=\"_blank\">     <img alt=\"Music career skills\" src=\"https://tomhess.net/files/images/Infographic/FiveWaysToBuildYourMusicCareerFaster.jpg\"/>    </a>   </li>   <li>    Build a portfolio. This could include demo recordings, live performances, or music videos. Your portfolio will showcase your talents to potential collaborators, fans, and industry professionals.    <a href=\"https://www.amuse.io/en/categories/how-to/start-music-career/how-to-get-started-with-your-music-career/\" target=\"_blank\">     <img alt=\"Music career portfolio\" src=\"https://images.squarespace-cdn.com/content/v1/5fa01a949598905a5ef1c7bd/1690897461583-R7F0X8789GQIO8ZFUVDI/What+Does+a+Portfolio+Career+in+Music+Look+Like.jpg\"/>    </a>   </li>   <li>    Network with other musicians. Get involved in the local music scene and meet other musicians who share your interests. You can collaborate on projects, perform together, and support each other's careers.    <a href=\"https://www.connollymusic.com/stringovation/starting-a-music-career\" target=\"_blank\">     <img alt=\"Music career networking\" src=\"https://www.careersinmusic.com/wp-content/uploads/2019/01/music-employment.jpg\"/>    </a>   </li>   <li>    Promote your music. Use social media, streaming platforms, and other online tools to reach a wider audience. You can also play live shows and distribute physical copies of your music.    <a href=\"https://www.indeed.com/career-advice/finding-a-job/music-careers\" target=\"_blank\">     <img alt=\"Music career promotion\" src=\"https://blog.reverbnation.com/wp-content/uploads/2022/07/1500x1000-balance-creative-promotion.jpg\"/>    </a>   </li>  </ol>  <p>   Here are some additional tips for starting your music career:  </p>  <ul>   <li>    Be patient and persistent.   </li>   <li>    Be original and authentic.   </li>   <li>    Be open to feedback and collaboration.   </li>   <li>    Have fun!   </li>  </ul>  <p>   Starting a music career can be challenging, but it's also incredibly rewarding. If you're passionate about music and willing to put in the work, you can achieve your goals.  </p> </body></html>`,
    // },
  ]);
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
          thread_id: "",
        };

        setChatMessages((prevResults) => [...prevResults, messageObject]);
        setInputValue("");

        const res = await axios({
          method: "post",
          url: import.meta.env.VITE_BACKEND_URL,
          data: messageObject,
          headers: {
            Authorization: import.meta.env.VITE_AUTHORIZATION,
          },
        })
          .then(function (response) {
            //handle success
            if (response?.data?.status === 200) {
              const obj = {
                role: "assistant",
                content: response?.data?.content,
              };
              setChatMessages((prevResults) => [...prevResults, obj]);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              enqueueSnackbar(`${response?.data?.message}`, {
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
