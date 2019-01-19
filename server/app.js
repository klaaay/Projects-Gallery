const expree = require("express");
const fs = require("fs");
const app = expree();

const { DOMAIN } = require("./config")

var navbarInfo = [];

var projectsData = {
    classify0: [],
    classify1: [],
    classify2: [],
    classify3: [],
    classify4: [],
    classify5: []
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

var classifys = fs.readdirSync("./data");

var navbarInfo = classifys.sort().map((item, index) => {
    var iconName = "";
    switch (item) {
        case "0智能大数据":
            iconName = "database";
            break;
        case "1智能控制":
            iconName = "tool";
            break;
        case "2智慧电力":
            iconName = "robot";
            break;
        case "3智能环境":
            iconName = "global";
            break;
        case "4智慧健康":
            iconName = "heart";
            break;
        case "5区块链":
            iconName = "sliders";
            break;
        default:
            break;
    }
    return {
        text: item.slice(1),
        icon: `${DOMAIN}/projectShowServer/data/${item}/${item.slice(1)}.png`,
        iconName
    }
})

classifys.sort().forEach(async (classify, index_classify) => {
    fs.readdirSync(`./data/${classify}`).filter(project => (project.slice(-4) !== ".png")).map((project, index_project) => {
        var description = fs.readFileSync(`./data/${classify}/${project}/description.txt`);
        var file_items = fs.readdirSync(`./data/${classify}/${project}`);
        var pic = [];
        var video = [];
        var ppt = "";
        if (file_items.includes("img")) {
            pic = fs.readdirSync(`./data/${classify}/${project}/img`).filter(img_item => (img_item.split(".")[0] !== "cover" && img_item !== "thumbs")).map(img_item => ({
                original: `${DOMAIN}/projectShowServer/data/${classify}/${project}/img/${img_item}`,
                thumbnail: `${DOMAIN}/projectShowServer/data/${classify}/${project}/img/thumbs/${img_item}`,
                originalClass: 'imgGallery',
                originalTitle: img_item.split('.')[0],
                thumbnailTitle: img_item.split('.')[0]
            }));
        }
        if (file_items.includes('video')) {
            video = fs.readdirSync(`./data/${classify}/${project}/video`).filter(video_item => (video_item.split(".")[1] === "jpg")).map(video_item => ({
                video: `${DOMAIN}/projectShowServer/data/${classify}/${project}/video/${video_item.split(".")[0]}.mp4`,
                thumb: `${DOMAIN}/projectShowServer/data/${classify}/${project}/video/${video_item.split(".")[0]}.jpg`
            }));
        }
        if (file_items.includes('ppt')) {
            ppt = fs.readFileSync(`./data/${classify}/${project}/ppt/ppt.txt`).toString();
        }
        var project_item = {
            info: {
                title: `${project}`,
                description: description.toString(),
                pic: `${DOMAIN}/projectShowServer/data/${classify}/${project}/img/cover.jpg`,
                page: Math.floor(index_project / 8) + 1,
                classify: parseFloat(classify.slice(0, 1))
            },
            pic,
            video,
            ppt
        }
        projectsData['classify' + classify.slice(0, 1)].push(project_item);
    })
})

app.use('/', (req, res, next) => {
    res.json({
        navbarInfo,
        ...projectsData
    })
})

app.listen(3030)