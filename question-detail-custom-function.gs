//custi=om sheet function that adds the question details to the sheet
/**
 * Gets question detail from leetcode
 *
 * @param {text} slug
 * @return {text} title
 * @customfunction
 */

function LEETDETAIL(slug) {
    if (slug == "") {
        return "";
    }

    let detail = UrlFetchApp.fetch("https://leetcode.com/graphql", {
        headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-ch-ua":
                '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
        },
        payload: `{\"operationName\":\"questionData\",\"variables\":{\"titleSlug\":\"${slug}\"},\"query\":\"query questionData($titleSlug: String!) {\\n  question(titleSlug: $titleSlug) {\\n    questionId\\n    questionFrontendId\\n    boundTopicId\\n    title\\n    titleSlug\\n    content\\n    translatedTitle\\n    translatedContent\\n    isPaidOnly\\n    canSeeQuestion\\n    difficulty\\n    likes\\n    dislikes\\n    isLiked\\n    similarQuestions\\n    exampleTestcases\\n    categoryTitle\\n    contributors {\\n      username\\n      profileUrl\\n      avatarUrl\\n      __typename\\n    }\\n    topicTags {\\n      name\\n      slug\\n      translatedName\\n      __typename\\n    }\\n    companyTagStats\\n    codeSnippets {\\n      lang\\n      langSlug\\n      code\\n      __typename\\n    }\\n    stats\\n    hints\\n    solution {\\n      id\\n      canSeeDetail\\n      paidOnly\\n      hasVideoSolution\\n      paidOnlyVideo\\n      __typename\\n    }\\n    status\\n    sampleTestCase\\n    metaData\\n    judgerAvailable\\n    judgeType\\n    mysqlSchemas\\n    enableRunCode\\n    enableTestMode\\n    enableDebugger\\n    envInfo\\n    libraryUrl\\n    adminUrl\\n    challengeQuestion {\\n      id\\n      date\\n      incompleteChallengeCount\\n      streakCount\\n      type\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        method: "post",
        validateHttpsCertificates: false,
        muteHttpExceptions: true,
    });
    // console.log(title.getResponseCode(),)

    let res = JSON.parse(detail.getContentText());
    console.log(res);
    data = res.data.question;
    if (data == null) {
        return "Please verify the question ID!";
    }

    let topic = data.topicTags.map((data) => {
        return data.name;
    });
    return [
        [
            data.questionFrontendId,
            data.title,
            data.difficulty,
            topic.toString(),
            `https://leetcode.com/problems/${slug}`,
        ],
    ];
}
