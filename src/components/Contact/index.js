import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Snackbar, SnackbarContent } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 960px) {
    padding: 0px;
    margin-top: 60px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0px 40px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  border: 2px solid ${({ theme }) => theme.white + 20};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 0px 72px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  align-self: center;
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.white + 60};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  max-width: 100%;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.white + 60};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactButton = styled.input`
  width: 30%;
  align-self: center;
  text-decoration: none;
  text-align: center;
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  background: #4285F4;
  background: linear-gradient(225deg, #083c91, #4285F4);
  transition: all 0.2s ease-in-out !important;
  
  @media (max-width: 768px) {
    width: 50%;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    filter: brightness(1);
    cursor: pointer;
  }
`;

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_1aoal9g', 'template_jakhopa', form.current, 'IZnfA0HyiWOQDh3Cl')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to contact me for work inquiries or collaborations!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit} autoComplete="off">
          <ContactTitle>Send me an email.</ContactTitle>
          <ContactInput placeholder="Name" name="from_name" required/>
          <ContactInput placeholder="Email" name="from_email" type="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" required/>
          <ContactInput placeholder="Subject" name="subject" required/>
          <ContactInputMessage placeholder="Message" rows="4" name="message" required/>
          <ContactButton type="submit" value="Send" />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          style={{ top: '68%', transform: 'translateY(-50%)', translateX: '-50%', left: '1%', position: 'absolute' }}
        >
          <SnackbarContent
            message="Email sent successfully!"
            style={{ background: 'linear-gradient(to right, #083c91, #4285F4)' }}
          />
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
