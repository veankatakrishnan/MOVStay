import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: 'Mugilan S S',
      role: 'Owner Module Developer',
      description: 'Developed the House Owner portal for PG listing management, room availability tracking, and owner analytics dashboard.',
      image: '/Teammate 1.jpeg'
    },
    {
      name: 'Veankata Krishnan S M',
      role: 'Admin & Student Matching Module Developer',
      description: 'Built the Admin dashboard for platform monitoring and implemented the roommate compatibility matching system.',
      image: '/Teammate 2.png'
    },
    {
      name: 'Vasantha Kumar G R',
      role: 'Student Module & AI Developer',
      description: 'Developed the Student portal with accommodation search, AI-based PG recommendations, and booking workflow.',
      image: '/Teammate 3.jpeg'
    }
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <h2 className="section-title">Meet the MOV Stay Development Team</h2>
        <p className="section-subtitle">The innovative minds behind the smart accommodation platform</p>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-desc">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
