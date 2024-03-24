import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';


const PDFViewer = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    WebViewer(
      {
        path: '../../lib',
        initialDoc: '/files/hello.pdf',
        licenseKey: '1711243020967:7f0cd4b00300000000394b059a4d589647c1ce5bc19e9f9fe12852c92f'  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
           X: 100,
           Y: 150,
           Width: 2000,
           Height: 2000,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="">
      <div className="header">React sample</div>
      <div className="webviewer h-lvh	" ref={viewer}></div>
    </div>
  );
};

export default PDFViewer;