import { memo, useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "../../utils/pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import classes from "./PdfViewer.module.scss";

export const PdfViewerSingle = ({ file, pageNum, onLoadSuccessHandler }) => {
  return (
    <Document
      file={file}
      loading=""
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

export const PdfViewerMultiple = memo(
  ({ file, numPages, pageNum, setPageNum }) => {
    const onItemClick = (pageNum) => {
      setPageNum(pageNum);
    };
    return (
      <>
        <Document file={file} loading="" className={classes.toc}>
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
  }
);

const PdfViewer = memo(({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNum, setPageNum] = useState(1);

  const onLoadSuccessHandler = ({ numPages }) => {
    setNumPages(numPages);
  };

  const prevPage = () => {
    setPageNum((state) => state - 1);
  };

  const nextPage = () => {
    setPageNum((state) => state + 1);
  };

  return (
    <div className={classes.pdfContainer}>
      <div className={classes.pdfWrapper}>
        <PdfViewerSingle
          file={file}
          pageNum={pageNum}
          onLoadSuccessHandler={onLoadSuccessHandler}
        />
        <div className={classes.pdfNav}>
          <a href={file} title="Download" download className={classes.download}>
            <span className="material-icons-outlined">file_download</span>
            Download
          </a>
          <button
            disabled={pageNum <= 1}
            onClick={prevPage}
            title="Previous page"
          >
            <span className="material-icons-outlined">arrow_back_ios</span>
          </button>
          <p>{pageNum || (numPages ? 1 : "--")}</p>
          <button
            disabled={pageNum >= numPages}
            onClick={nextPage}
            title="Next page"
          >
            <span className="material-icons-outlined">arrow_forward_ios</span>
          </button>
          <a
            href={file}
            target="_blank"
            title="Open in new tab"
            className={classes.launch}
          >
            Open in tab
            <span className="material-icons-outlined">launch</span>
          </a>
        </div>
      </div>
      <div className={classes.tocWrapper}>
        <PdfViewerMultiple
          file={file}
          numPages={numPages}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
      </div>
    </div>
  );
});

export default PdfViewer;
