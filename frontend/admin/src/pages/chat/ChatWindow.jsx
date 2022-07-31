import { chatUrl } from 'constants/index';
import React, { useEffect, useRef, useState } from 'react'
import { getVendorAllConversation, getVendorAllMessage, sendMessage } from 'services/chat/ChatService';
import io from 'socket.io-client'
import './chat.css'
import { ErrorToast, TryCatch } from 'utils';
import { Avatar, Divider, Stack, Box, Grid, IconButton, Menu, MenuItem } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from '@mui/icons-material/Send';
import { PhotoCamera } from '@mui/icons-material';
import ScrollableFeed from 'react-scrollable-feed'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'layouts/loader/loader';
let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
var options = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};

const ChatWindow = () => {
  const [conversations, setConversations] = useState([]);
  const [loader, setLoader] = useState(false)
  const [vendor, setVendor] = useState(null);
  const [text, setText] = useState(null);
  const sender = 'admin';
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Input = styled('input')({
    display: 'none',
  });
  const { id } = useParams();
  const history = useNavigate()
  const socket = useRef(io(chatUrl));
  const fetcher = async () => {
    TryCatch(async () => {
      const res = await getVendorAllConversation()
      setConversations(res?.data)
    })
  }
  const handleVendorMessage = (vendor) => {
    setAnchorEl(null);
    history(`/chat/vendor/${vendor?.vendor_id?._id}`);
  }
  const getAdminMessage = async () => {
    setVendor(null);
    setLoader(true);
    try {
      if (checkForValidMongoDbID.test(id)) {
        const res = await getVendorAllMessage(id);
        setVendor(res?.data);
      }
    } catch (error) {
      if (error?.response) {
        ErrorToast('Something went wrong')
      }
    } finally {
      setLoader(false);
    }
  }

  const sendMessageHandle = () => {
    if (!text) {
      ErrorToast('Enter Some Text');
    } else {
      TryCatch(async () => {
        await sendMessage({
          text,
          vendor_id: id
        })
        setText("");
        getAdminMessage();
        fetcher()
      })
    }
  }

  useEffect(() => {
    socket.current.on('admin-new-message', (data) => {
      fetcher();
      getAdminMessage();
    })
  }, []);

  useEffect(() => {
    fetcher();
    getAdminMessage();
  }, [id])
  return (
    <>
      <div className="container-chat bootstrap snippets">
        <div className="tile tile-alt" id="messages-main">
          <Box sx={{ display: { md: 'none' } }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <div className="list-group lg-alt">
                {
                  conversations?.map((vendor, index) => {
                    return (
                      <>
                        <div style={{ cursor: 'pointer' }} onClick={
                          () => handleVendorMessage(vendor)
                        }>
                          <div className="list-group-item media" key={index}>
                            <div className="pull-left">
                              <Stack direction="row" spacing={2}>
                                <Avatar
                                  sx={{ bgcolor: deepOrange[500] }}
                                  src={vendor?.vendor_id?.logo?.url}
                                >
                                  {vendor?.vendor_id?.seller_account?.shop_name?.charAt(0)}
                                </Avatar>
                                <strong className="mt-2 mx-2">{vendor?.vendor_id?.seller_account?.shop_name}</strong>
                              </Stack>
                            </div>
                            <div className="media-body">
                              <span className="list-group-item-text c-gray">{
                                vendor?.messages?.length > 15 ? <>{vendor?.messages?.slice(0, 15)}...</> : vendor?.messages
                              }</span>
                            </div>
                          </div>
                          <Divider />
                        </div>
                      </>
                    )
                  })
                }
              </div>
            </Menu>
          </Box>
          <div className="ms-menu" style={{
            height: '90vh',
            overflowY: 'auto'
          }}>
            <div className="list-group lg-alt">

              {
                conversations?.map((vendor, index) => {
                  return (
                    <div style={{ cursor: 'pointer' }} onClick={() => handleVendorMessage(vendor)}>
                      <div className="list-group-item media" key={index}>
                        <div className="pull-left">
                          <Stack direction="row" spacing={2}>
                            <Avatar
                              sx={{ bgcolor: deepOrange[500] }}
                              src={vendor?.vendor_id?.logo?.url}
                            >
                              {vendor?.vendor_id?.seller_account?.shop_name?.charAt(0)}
                            </Avatar>
                            <strong className="mt-2 mx-2">{vendor?.vendor_id?.seller_account?.shop_name}</strong>
                          </Stack>
                        </div>
                        <div className="media-body">
                          <span className="list-group-item-text c-gray">{
                            vendor?.messages?.length > 15 ? <>{vendor?.messages?.slice(0, 15)}...</> : vendor?.messages
                          }</span>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  )
                })
              }
            </div>
          </div>
          {
            vendor ? <div className="ms-body" style={{
              height: '90vh',
              overflowY: 'auto'
            }}>
              {
                loader ? <span><Loader /></span> : <>
                  <div className="action-header clearfix">
                    <div className="d-block d-sm-none" id="ms-menu-trigger">
                      <i className="fa fa-bars"></i>
                    </div>

                    <Stack direction="row" spacing={2}>
                      <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        src={vendor?.vendor_id?.logo?.url}
                      >
                        {vendor?.vendor_id?.seller_account?.shop_name?.charAt(0)}
                      </Avatar>
                      <strong className="mt-2 mx-2">{vendor?.vendor_id?.seller_account?.shop_name}</strong>
                    </Stack>
                  </div>

                  <ScrollableFeed>
                    <div style={{ marginTop: '52px' }}>
                      {
                        vendor?.messages && vendor?.messages?.length ? <>
                          {
                            vendor?.messages?.map((message, index) => {
                              return <span key={index}>
                                <div className={`message-feed ${message?.sender === sender ? 'right' : 'media'}`}>
                                  <div className="media-body">
                                    <div className="mf-content">
                                      {message?.text}
                                    </div>
                                    <small className="mf-date"><i className="fa fa-clock-o"></i>
                                      {new Date(message.created)?.toLocaleString('en-BD', options)}
                                    </small>
                                  </div>
                                </div>
                              </span>
                            })
                          }
                        </> : null
                      }
                    </div>
                    <div className="footer" style={(vendor?.messages?.length < 3) ? { marginTop: '300px' } :
                      (vendor?.messages?.length > 5) ? { marginTop: '0px' } : (!vendor?.messages?.length) ? { marginTop: '600px' } : { marginTop: '50px' }}>
                      <Grid item sm={6}>
                        <Box display="flex" justifyContent="flex-end" >
                          <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" />
                            <IconButton sx={{ color: 'green' }} >
                              <PhotoCamera title="Send Message" />
                            </IconButton>
                          </label>
                          <IconButton sx={{ color: 'green' }} onClick={sendMessageHandle}>
                            <SendIcon />
                          </IconButton>
                        </Box>
                      </Grid>
                      <div className="msb-reply clearfix">
                        <textarea placeholder="What's on your mind..." onChange={(e) => setText(e.target.value)} value={text}></textarea>
                      </div>
                    </div>
                  </ScrollableFeed>
                </>
              }

            </div> : null
          }
        </div>
      </div>
    </>
  )
}

export default ChatWindow