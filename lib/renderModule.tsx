import PdfModule from "../components/Project/PdfModule";
import TutorialModule from "../components/Project/TutorialModule";
import BlankModule from "../components/Project/BlankModule";
import { TTutorialModule, TPdfModule, TVideoModule } from "../types/modules";
import VideoModule from "../components/Project/VideoModule";

const renderModule = (module: any) => {
	switch (module?.type) {
		case "pdf":
			return <PdfModule module={module as TPdfModule} />;
		case "tutorial":
			return <TutorialModule module={module as TTutorialModule} />;
		case "video":
			return <VideoModule module={module as TVideoModule} />;
		default:
			return <BlankModule />;
	}
};

export default renderModule;
