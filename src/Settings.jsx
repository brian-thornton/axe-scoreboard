import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas'

import MatchHistory from "./MatchHistory";

const Settings = ({ }) => {
  const pdfRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);
  const [wallpaperImage, setWallpaperImage] = useState(localStorage["wallpaper"]);

  const downloadComponentInPDF = async (component) => {
    await html2canvas(component).then((canvas) => {
      const componentWidth = component.offsetWidth
      const componentHeight = component.offsetHeight

      const orientation = componentWidth >= componentHeight ? 'l' : 'p'

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation,
        unit: 'px'
      })

      pdf.internal.pageSize.width = componentWidth
      pdf.internal.pageSize.height = componentHeight

      pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
      pdf.save('download.pdf')
      setIsRendering(false);
    })
  }

  useEffect(() => {
    if (isRendering) {
      downloadComponentInPDF(document.getElementById("matchHistoryExport"))
    }
  }, [isRendering]);

  const imageUpload = (e) => {
    const file = e.target.files[0];
    getBase64(file).then(base64 => {
      localStorage["wallpaper"] = base64;
      setWallpaperImage(base64);
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  return (
    <Container fluid>
      <Row>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>System Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={localStorage['title']} onChange={(e) => {
            localStorage["title"] = e.target.value;
          }} />
        </Form.Group>
      </Row>
      <Row>
        {wallpaperImage && <img src={localStorage["wallpaper"]} style={{ width: '300px', height: '300px' }} alt="Axe" />}
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Wallpaper Image</Form.Label>
          <Form.Control type="file" onChange={imageUpload} />
        </Form.Group>
      </Row>
      <Row>
        <div>Lane Configuration:</div>
        <div style={{ float: 'right' }}>
          <Form.Check
            inline
            label="Single Target"
            name="targets"
            type="radio"
            id={`singleTarget`}
            onChange={(e) => {
              if (e.target.value === 'on') {
                localStorage["laneConfig"] = 'singleTarget';
              } else {
                localStorage["laneConfig"] = 'sideBySideTargets';
              }
            }}
          />
          <Form.Check
            inline
            label="Side by Side Targets"
            name="targets"
            type="radio"
            id={`sideBySideTargets`}
            onChange={(e) => {
              if (e.target.value === 'on') {
                localStorage["laneConfig"] = 'sideBySideTargets';
              } else {
                localStorage["laneConfig"] = 'singleTarget';
              }
            }}
          />
        </div>
      </Row>
      <Row>
        <Button onClick={() => {
          setIsRendering(true);
        }}>Export to PDF</Button>
      </Row>
      <Row>
        <Button onClick={() => {
          localStorage.removeItem("title");
          localStorage.removeItem("matchHistory");
          localStorage.removeItem("wallpaper");
          localStorage.removeItem("teams");
          localStorage.removeItem("players");
          window.location.reload();
        }}>
          Clear All Data
        </Button>
      </Row>
      <div style={{ visibility: isRendering ? 'visible' : 'hidden' }} id="matchHistoryExport">
        <h2>{`${localStorage["title"] || 'Axe Scoreboard'} - Match History Export`}</h2>
        <MatchHistory ref={pdfRef} />
      </div>
    </Container >
  )
};

export default Settings;