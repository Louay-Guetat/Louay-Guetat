import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
class Skills extends Component {
  render() {
    if (this.props.languages && this.props.resumeBasicInfo && this.props.frameworks && this.props.databases) {
      var sectionName = this.props.resumeBasicInfo.section_name.skills;
      var languages = this.props.languages.icons.map(function (language, i) {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <div className="text-center skills-tile">
                <i className={language.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "35%", marginTop: "4px" }}
                  >
                    {language.name}
                  </p>
                </i>
              </div>
            </span>
          </li>
        );
      });

      var frameworks = this.props.frameworks.icons.map(function (framework, i) {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <div className="text-center skills-tile">
                <i className={framework.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "35%", marginTop: "4px" }}
                  >
                    {framework.name}
                  </p>
                </i>
              </div>
            </span>
          </li>
        );
      });

      var databases = this.props.databases.icons.map(function (database, i) {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <div className="text-center skills-tile">
                <i className={database.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "35%", marginTop: "4px" }}
                  >
                    {database.name}
                  </p>
                </i>
              </div>
            </span>
          </li>
        );
      });
    }
    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="section-title">
              <span className="text-white">{sectionName}</span>
            </h1>
          </div>
          <Row>
            <Col md={4}>
                <h1 className="section-title">
                  {this.props.language === 'en' ?(
                    <span className="text-white">Languages</span>
                  ):(
                    <span className="text-white">Languages de programmation</span>
                  )}
                </h1>
              <ul className="list-inline mx-auto skill-icon">{languages}</ul>
            </Col>
            <Col md={4}>
              <h1 className="section-title">
                <span className="text-white">frameworks</span>
              </h1>
              <ul className="list-inline mx-auto skill-icon">{frameworks}</ul>
            </Col>
            <Col md={4}>
              <h1 className="section-title">
                {this.props.language === 'en' ?(
                  <span className="text-white">Databases</span>
                ):(
                  <span className="text-white">Bases de Données</span>
                )}  
              </h1>
              <ul className="list-inline mx-auto skill-icon">{databases}</ul>
            </Col>
          </Row>
       </div>
      </section>
    );
  }
}

export default Skills;
