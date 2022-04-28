import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import MatchHistory from "./MatchHistory";
import html2canvas from 'html2canvas'


const Settings = ({ }) => {
  const pdfRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);
  const [wallpaperImage, setWallpaperImage] = useState(localStorage["wallpaper"]);

  const handleDownload = () => {
    const content = document.getElementById("matchHistoryExport")
    console.log(content);
    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save('sample.pdf');
      },
      width: 200, // <- here
      windowWidth: 1000 // <- here
    });
  };


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

  const doStuff = () => {

  }

  useEffect(() => {
    if (isRendering) {
      downloadComponentInPDF(document.getElementById("matchHistoryExport"))
    }}, [isRendering]);

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
          // downloadComponentInPDF(document.getElementById("matchHistoryExport"));

          //   // Default export is a4 paper, portrait, using millimeters for units
          //   const doc = new jsPDF();

          //   // doc.text("Axe Throwing Results", 10, 10);


          //   ReactDOM.render(<MatchHistory />, document.getElementById('root'));

          //   // doc.html(document.getById('#matchHistory'));
          //   // doc.save('table.pdf')

          //   doc.html(document.getById('#matchHistory'), {
          //     callback: function (doc) {
          //       doc.save();
          //     },
          //     x: 10,
          //     y: 10
          //  });

          //  doc.save('table.pdf')

          // const matchHistoryStorage = localStorage.getItem('matchHistory');
          // let matchHistory = [];
          // if (matchHistoryStorage) {
          //   matchHistory = JSON.parse(matchHistoryStorage);
          // }

          // matchHistory.sort((a,b) => {
          //   return new Date(b.matchDate) - new Date(a.matchDate);
          // }).map((match, index) => {
          //   doc.setFontSize(12);
          //   doc.text(match.matchDate, 15, 10 + (index + 1) * 30);
          //   autoTable(doc, {
          //     head: [['Name', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Total']],
          //     body: match.players.map((player) => [
          //         player.name, player.matchThrows[1], player.matchThrows[2], player.matchThrows[3], player.matchThrows[4], player.matchThrows[5], player.matchThrows[6], player.matchThrows[7], player.matchThrows[8], player.matchThrows[9], player.matchThrows[10], player.matchTotal,
          //       ]),
          //   });

          //   doc.save('table.pdf')
          // });
        }}>Export to PDF</Button>
      </Row>
      <div style={{ visibility: isRendering ? 'visible' : 'hidden' }} id="matchHistoryExport">
        <h2>{`${localStorage["title"] || 'Axe Scoreboard'} - Match History Export`}</h2>
        <MatchHistory ref={pdfRef} />
      </div>
    </Container >
  )
};

export default Settings;