import PdfModule from "../components/Project/PdfModule";
import TutorialModule from "../components/Project/TutorialModule";
import BlankModule from "../components/Project/BlankModule";
import { TTutorialModule, TPdfModule, TVideoModule, TModule } from "../types/modules";
import VideoModule from "../components/Project/VideoModule";
import { IProjectReadOnly } from "../types/projects";
import PlaytestModule from "../components/Project/PlaytestModule";

const renderModule = (module: TModule, data: IProjectReadOnly) => {
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
