import PdfModule from "../components/Project/Modules/PdfModule";
import TutorialModule from "../components/Project/Modules/TutorialModule";
import BlankModule from "../components/Project/Modules/BlankModule";
import { TTutorialModule, TPdfModule, TVideoModule, TModule } from "../types/modules";
import VideoModule from "../components/Project/Modules/VideoModule";
import { TProject } from "../types/projects";
import PlaytestModule from "../components/Project/Modules/PlaytestModule";

const renderModule = (module: TModule, data: TProject) => {
	switch (module?.type) {
		case "pdf":
			return <PdfModule module={module as TPdfModule} />;
		case "tutorial":
			return <TutorialModule module={module as TTutorialModule} />;
		case "video":
			return <VideoModule module={module as TVideoModule} />;
		case "playtest":
			return <PlaytestModule module={module} data={data} />;
		default:
			return <BlankModule />;
	}
};

export default renderModule;
