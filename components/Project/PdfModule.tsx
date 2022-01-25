import { PDFModule } from "../../types/modules";

interface Props {
	module: PDFModule;
}

const PdfModule = ({ module }: Props): JSX.Element => {
	return (
		<div style={{ width: "1000px", maxWidth: "100%", height: "100%" }}>
			<embed src={module.url} width="100%" height="100%" />
		</div>
	);
};

export default PdfModule;
