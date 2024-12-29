import React, { useState } from 'react';
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider, ShowMoreButton } from './ProjectsStyle';
import ProjectCard from '../Cards/ProjectCards';
import { projects } from '../../data/constants';

const Projects = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState(6); // State to control the number of visible projects

  // Filter projects based on the selected category
  const filteredProjects = toggle === 'all' ? projects : projects.filter((item) => item.category === toggle);

  // Show only the number of projects specified by visibleProjects
  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const handleShowMore = () => {
    setVisibleProjects((prevVisibleProjects) => prevVisibleProjects + 6); // Increase the number of visible projects by 6
  };

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup>
          <ToggleButton active={toggle === 'all'} value="all" onClick={() => setToggle('all')}>All</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === 'web app'} value="web app" onClick={() => setToggle('web app')}>WEB APP'S</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === 'android app'} value="android app" onClick={() => setToggle('android app')}>ANDROID APP'S</ToggleButton>
        </ToggleButtonGroup>
        <CardContainer>
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} openModal={openModal} setOpenModal={setOpenModal} />
          ))}
        </CardContainer>
        {visibleProjects < filteredProjects.length && (
          <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default Projects;
