import styled from 'styled-components'
import React from 'react';
import { FaCode, FaPaintBrush, FaAndroid, FaDesktop } from 'react-icons/fa';
import './Services.css';

const servicesData = [
  { icon: <FaCode />, title: 'Web Development', description: 'Create stunning websites with cutting-edge technologies for an immersive online presence.' },
  { icon: <FaAndroid />, title: 'Android Development', description: 'Shape the future of mobile applications with intuitive and feature-rich Android development.' },
  { icon: <FaDesktop />, title: 'UI/UX Design', description: 'Craft visually appealing and user-friendly interfaces for an enhanced digital experience.' },
  { icon: <FaPaintBrush />, title: 'Graphic Design', description: 'Express ideas through visually compelling designs, from logos to impactful marketing materials.' },
];

export const Title = styled.div`
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

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    padding: 0px 0px;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        font-size: 16px;
        padding: 0px 40px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1100px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 0px 0px 0px;
    @media (max-width: 960px) {
        padding: 0px;
    }
`;

const Services = () => {
  return (
    <Container id="services">
        <Wrapper>
            <Title>Services</Title>
            <Desc>Empowering your digital presence with my diverse range of services.</Desc>
            <div className="services-section">
                {servicesData.map((service, index) => (
                <div key={index} className="service">
                    <div className="service-icon">{service.icon}</div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                </div>
                ))}
            </div>
        </Wrapper>
    </Container>
  );
};

export default Services;
