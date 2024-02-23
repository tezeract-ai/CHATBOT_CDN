import React from "react";
import { makeStyles } from "@mui/styles";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import animationData from "../../../assets/Typing.json";
import Lottie from "react-lottie";

import { IconButton, Typography, Avatar, TextField, Box } from "@mui/material";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = makeStyles({
  fabContainer: {
    position: "fixed",
    bottom: 20,
    zIndex: 9999,
    right: 20,
  },
  fab: {
    margin: 0,
    position: "absolute !important",
    right: 20,
    bottom: 15,
  },

  leftContainer: {
    marginRight: "auto",
    marginBottom: 10,
    borderRadius: "8px",
  },
  rightContainer: {
    marginLeft: "auto",
    borderRadius: "8px",
    maxWidth: 500,
    my: 1,
  },
});

const ChatBotView = ({
  openChat,
  handleChatOpen,
  handleChatClose,
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
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.fabContainer}>
      {openChat && (
        <Box
          sx={{
            margin: 3,
            mb: 10,
            height: 480,
            width: { md: 400, sm: 400, xs: "auto" },
            boxShadow: "2px 2px 20px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            borderRadius: 5,
            zIndex: 9999,
            backgroundColor: "white",
          }}
        >
          <Box sx={{ position: "relative", width: "100%", zIndex: 1000 }}>
            <img
              src="https://res.cloudinary.com/de8tf7yki/image/upload/v1708693818/vrgzp9opcadmxdrvj0gp.png"
              alt="chat-top"
              height="70%"
              width="100%"
            />
            <Box
              sx={{
                position: "absolute",
                top: 2,
                padding: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  p: { md: 1, sm: 1, xs: 1 },
                  display: "block",
                }}
              >
                <Typography
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: 500,
                    fontFamily: "Outfit",
                  }}
                >
                  Hello User
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            id="chat-window"
            sx={{
              height: "calc(100% - 50px)", // Adjust the height of the chat window
              marginTop: -4,
              padding: 2,
              position: "relative",
              backgroundColor: "white",
              backgroundImage: `url(https://res.cloudinary.com/de8tf7yki/image/upload/v1708693803/laovlinusvkp69yw6sb9.png)`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              overflow: "auto",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "0.3em",
              },
              "&::-webkit-scrollbar-track": {
                background: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "transparent",
              },
            }}
          >
            {chatMessages?.length > 0 ? (
              <>
                {chatMessages?.map((msg, index) => {
                  let latest = index == chatMessages.length - 1;

                  return (
                    <Box
                      className={classes.leftContainer}
                      key={index}
                      ref={latest ? lastItemRef : null}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor:
                              msg?.role === "user" ? "#DBE9FF" : "#EBEEF1",
                            p: 1,
                            borderRadius: "8px",
                            margin: 0,
                          }}
                        >
                          {msg?.role === "assistant" ? (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  textAlign: "left",
                                  whiteSpace: "normal",
                                  wordWrap: "break-word",
                                }}
                              >
                                <div
                                  dangerouslySetInnerHTML={createMarkup(
                                    msg,
                                    msg?.content
                                  )}
                                />
                              </Box>
                            </Box>
                          ) : (
                            <Typography
                              sx={{
                                fontFamily: "Outfit",
                                fontSize: 16,
                                margin: 0,
                                padding: 0,
                                color: msg?.role === "user" ? "black" : "white",
                              }}
                            >
                              {msg?.content}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            position: "relative",
                            gap: 0.8,
                            p: 1,
                          }}
                        >
                          <Avatar
                            src={
                              msg?.role === "user"
                                ? "https://res.cloudinary.com/de8tf7yki/image/upload/v1708693783/lmtt8spvrqd4soly7ls8.png"
                                : "https://res.cloudinary.com/de8tf7yki/image/upload/v1708693782/yaq1gv1lvq2l4gbwxrni.png"
                            }
                            style={{
                              width: 26,
                              height: 26,
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: "Outfit",
                              fontSize: 16,
                              margin: 0,
                              padding: 0,
                            }}
                          >
                            {msg?.role === "user" ? "User" : "Bot"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
                <Box
                  sx={{
                    width: "20%",
                  }}
                >
                  {isLoading && <Lottie options={defaultOptions} width={50} />}
                </Box>
              </>
            ) : null}
          </Box>
          <Box
            sx={{
              mx: 2,
              my: 2,
            }}
          >
            <form onSubmit={(e) => sendMessage(e)}>
              <TextField
                placeholder="Send a message"
                fullWidth
                autoComplete="off" // Turn off auto suggestions
                InputProps={{
                  endAdornment: (
                    <IconButton type="submit" sx={{ cursor: "pointer" }}>
                      <SendIcon fontSize="small" />
                    </IconButton>
                  ),
                  style: {
                    height: 38,
                    borderRadius: 100,
                    fontSize: "0.9rem",
                    marginLeft: 3,
                  },
                }}
                sx={{
                  "& fieldset": { borderColor: "#0079CC" },
                  "&:hover fieldset": { borderColor: "#0079CC !important" }, // Change border color on hover
                  "&:focus-within fieldset": {
                    borderColor: "#0079CC !important",
                  },
                  input: {
                    "&::placeholder": {
                      color: "#718096",
                      opacity: 1,
                    },
                  },
                }}
                value={inputValue}
                onChange={handleInputChange}
              />
            </form>
          </Box>
        </Box>
      )}

      {/* Conditionally render the chat button based on openChat state */}
      <Fab
        color="primary"
        aria-label={openChat ? "close" : "chat"}
        className={classes.fab}
        onClick={openChat ? handleChatClose : handleChatOpen}
      >
        {openChat ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </Box>
  );
};

export default ChatBotView;
