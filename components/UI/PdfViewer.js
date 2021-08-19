import { memo, useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../../utils/pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import classes from "./PdfViewer.module.scss";

const PdfViewer = ({ file, pageNum, onLoadSuccessHandler }) => {
  return (
    <Document
      file={file}
      onLoadSuccess={onLoadSuccessHandler}
      className={classes.doc}
    >
      <Page
        pageNumber={pageNum}
        renderTextLayer={false}
        className={classes.page}
      />
    </Document>
  );
};

export default PdfViewer;

export const PdfViewerAll = memo(({ file, numPages, pageNum, setPageNum }) => {
  const onItemClick = (pageNum) => {
    setPageNum(pageNum);
  };
  return (
    <>
      <Document file={file} className={classes.toc}>
        {[...Array(numPages).keys()].map((_, index) => (
          <div key={index} onClick={onItemClick.bind(this, index + 1)}>
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              className={`${classes.tocItem} ${
                index + 1 === pageNum ? classes.activeItem : ""
              }`}
            />
          </div>
        ))}
      </Document>
    </>
  );
});
