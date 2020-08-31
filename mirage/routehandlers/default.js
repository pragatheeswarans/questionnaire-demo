function getAllQuestionnaires(db, /* request */) {
  const { questionnaires } = db;
  return {
    meta: {
      offset: 0,
      limit: questionnaires.length,
      count: questionnaires.length,
      next: null,
      previous: null
    },
    data: questionnaires
  };
}

export { getAllQuestionnaires }