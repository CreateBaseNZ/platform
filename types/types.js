import { ReactElement } from "react";

/**
 * @typedef {string} Color A CSS color value
 */

/**
 * @typedef {Object} ProjectSubject
 * @property {Color} color Subject color
 * @property {string} label Subject title
 */

/**
 * @typedef {number} MinCompletionTime Recommended minimum time required for non-coding pages to be completed (in seconds)
 */

/**
 * @typedef {string[]} Caption Small caption that appears on the Imagine step above the modules. Each item in the array is separated by a new line
 */

/**
 * @typedef {Object} CADs Object containing curriculum alignment documents for supported regions
 * @property {string} nz New Zealand
 * @property {string} aus Australia
 * @property {string} cali California, USA
 * @property {string} uk United Kingdom
 */

/**
 * @typedef {Object} ModulePDF PDF module
 * @property {"pdf"} type Constant value
 * @property {string} title Label displayed on the thumbnail
 * @property {string} img Thumbnail image source
 * @property {string} url PDF file source
 */

/**
 * @typedef {Object} ModuleTut Tutorial module
 * @property {"tut"} type Constant value
 * @property {string} title Label displayed on the thumbnail
 * @property {Array<{src: string, subtitle: ReactElement}>} items
 */

/**
 * @typedef {Object} ModuleVideo Video module
 * @property {"video"} type Constant value
 * @property {string} title Label displayed on the thumbnail
 * @property {Object} data Additional parameters
 * @property {string} data.url Hyperlink to video on YouTube
 * @property {string} data.src Link to source video
 * @property {string} data.h1 Video heading
 * @property {string} data.h2 Video blurb
 * @property {string} data.title Video title // TODO is this a duplicate of h1???
 */

/**
 * @typedef {Object} ModuleExplore Explore module
 * @property {"explore"} type Constant value
 * @property {string} title Label displayed on the thumbnail
 * @property {import("../data/explore-data").Boost[]} items Array of supplementary Boosts
 */

/**
 * @typedef {Array<ModulePDF|ModuleTut|ModuleExplore>} ModuleArray
 */

/**
 * @typedef {Object} DefineStep
 * @property {MinCompletionTime} threshold Recommended time to complete Define step
 * @property {string} url Hyperlink to situation video on YouTube
 * @property {string} src Hyperlink to source video hosted on GitHub
 * @property {string} h1 Title that appears under the situation video
 * @property {string} h2 Brief prompt below the title
 * @property {string} docs Google Docs lesson plan hyperlink
 * @property {string} word Lesson plan Word file source
 */

/**
 * @typedef {Object} ImagineStep
 * @property {MinCompletionTime} threshold Recommended time to complete Imagine step
 * @property {Caption} caption
 * @property {ModuleArray} modules Array of modules
 */

/**
 * @typedef {Object} Subsystem
 * @property {string} title
 * @property {string[]} requirements Array of prerequisite subsystem names (must be identical)
 * @property {string} imgSrc Subsystem preview image source
 * @property {string} description A brief description of the subsystem
 * @property {object} research Research data
 * @property {MinCompletionTime} research.threshold Recommended completion time for Research step
 * @property {Caption} research.caption
 * @property {}
 */

/**
 * @typedef {Object} ProjectData
 * @property {string} name Official project name
 * @property {string} query Project id (mostly used as URL query)
 * @property {string} caption Project overview description
 * @property {boolean} stacked Layout on coding pages, true if simulation on top of flow code, false otherwise
 * @property {string} scenePrefix Prefix identifier used in Unity scenes
 * @property {"loop"|"once"} runType Code execution type
 * @property {string} durPerLesson Duration per lesson
 * @property {number} numOfLessons Number of lessons in lesson plan
 * @property {"introductory"|"proficient"|"advanced"} difficulty Project difficulty
 * @property {ProjectSubject[]} subjects Array of project subjects
 * @property {string} learningOutcome Path to learning outcomes file in /public
 * @property {CADs} cads Curriculum alignment documents
 * @property {string} lessonPlan Path to lesson plan PDF in /public
 * @property {string[]} learnings Bullet-pointed list of learning outcomes
 * @property {DefineStep} define Define step data
 * @property {ImagineStep} imagine Imagine step data
 * @property {*} subsystems
 * @property {*} improve
 */
