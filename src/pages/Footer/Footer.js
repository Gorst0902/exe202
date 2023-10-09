import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import "bootstrap/dist/css/bootstrap.css";
import "../Footer/Footer.css";

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="footer">
      <div className="footer__content">
        <button>
          <i className="fa-solid fa-house" />
        </button>
        <button>
          <i className="fa-solid fa-list" />
        </button>
        <button className="search" onClick={handleOpen}>
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <button>
          <i className="fa-solid fa-bell" />
        </button>
        <button>
          <i className="fa-solid fa-gear" />
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Nhập địa chỉ bạn muốn đến
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <input
              type="text"
              placeholder="Nhập địa chỉ"
              className="modal__input"
            />
          </Typography>
        </Box>
      </Modal>

      
              
      
    </div>
  );
}
