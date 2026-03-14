import React from 'react';

const Gateway = () => {
  const modules = [
    {
      title: 'Student Portal',
      description: 'Search PGs, explore neighborhoods, find roommates, and book visits.',
      buttonText: 'Open Student Portal',
      url: 'https://movstay-alpha.vercel.app/'
    },
    {
      title: 'House Owner Portal',
      description: 'Manage PG listings, rooms, availability, and student enquiries.',
      buttonText: 'Open Owner Portal',
      url: 'https://movstayprod.vercel.app/'
    },
    {
      title: 'Admin Dashboard',
      description: 'Monitor platform analytics, user activity, and system insights.',
      buttonText: 'Open Admin Dashboard',
      url: 'https://mov-stay-admin.vercel.app/'
    }
  ];

  return (
    <section id="modules" className="gateway">
      <div className="container">
        <h2 className="section-title">Platform Modules</h2>
        <p className="section-subtitle">Gateway to your MOV Stay experience</p>
        
        <div className="cards-grid">
          {modules.map((mod, index) => (
            <div key={index} className="card">
              <h3 className="card-title">{mod.title}</h3>
              <p className="card-desc">{mod.description}</p>
              <a 
                href={mod.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                {mod.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gateway;
