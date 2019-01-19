export default (projects, page) => {
    return projects.filter(item => {
        return item.info.page === page;
    });
};