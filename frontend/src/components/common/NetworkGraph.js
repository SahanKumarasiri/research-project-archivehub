import React from "react";
import { useSelector } from "react-redux";
import Graph from "react-vis-network-graph";
import {
  DECODED_TOKEN,
  STATIC_NO_1,
  STATIC_NO_2,
  networkColabCount,
} from "../helpers/Helper";
import { notification } from "antd";

const NetworkGraph = ({
  data,
  profileURL,
  profile,
  previewUser,
  resultArray,
}) => {
  const nodes = [];
  const edges = [];

  const confirmation = useSelector(
    (state) => state?.auth?.confirmation?.data?.data?.users || []
  );

  const previewConfirmation = useSelector(
    (state) => state?.auth?.previewConfirmation?.data?.data?.users || []
  );

  const authToken = useSelector(
    (state) => state?.auth?.login?.data?.data?.token || null
  );

  const previewProfileData = useSelector(
    (state) => state?.auth?.previewProfile?.data?.data || []
  );

  const checkProfileData = useSelector(
    (state) => state?.auth?.checkProfile?.data?.data || []
  );

  const collaboratorsData = useSelector(
    (state) => state?.auth?.getCollaborators?.data?.data || []
  );

  const collaboratorsPreviewData = useSelector(
    (state) => state?.auth?.getPreviewCollaborators?.data?.data || []
  );

  const decodedToken = DECODED_TOKEN(authToken);

  if (profile === "preview") {
    nodes.push({
      id: 1,
      label:
        checkProfileData?.userId === decodedToken?.userId
          ? "You"
          : previewProfileData?.name === checkProfileData?.name
          ? "You"
          : previewProfileData?.name,
      shape: profileURL ? "circularImage" : "",
      image: profileURL,
      borderWidth: 4,
      size: 20,
    });
    edges.push({
      from: 2,
      to: 3,
    });
    let x = 100000;
    previewConfirmation
      ?.filter(
        (el) =>
          el?.status === "ACCEPTED" &&
          (el?.userId === previewUser?.userId ||
            el?.connectedWith === previewUser?.userId) &&
          !el?.deactivated &&
          !el?.deleted
      )
      ?.map((el, index) => {
        nodes.push({
          id: x,
          label:
            !(el?.connectedWith === previewUser?.userId) &&
            !(el?.actionUserImgURL === previewProfileData?.imgURL)
              ? `${el?.firstName} ${el?.lastName} ${
                  `${el?.firstName} ${el?.lastName}` ===
                  `${decodedToken?.firstName} ${decodedToken?.lastName}`
                    ? "(You)"
                    : ""
                }`
              : el?.connectedWith === previewUser?.userId &&
                el?.actionUserImgURL === previewProfileData?.imgURL
              ? `${el?.connectedUserInfo?.firstName} ${
                  el?.connectedUserInfo?.lastName
                } ${
                  `${el?.connectedUserInfo?.firstName} ${el?.connectedUserInfo?.lastName}` ===
                  `${decodedToken?.firstName} ${decodedToken?.lastName}`
                    ? "(You)"
                    : ""
                }`
              : "You",
          shape: profileURL ? "circularImage" : "",
          image:
            !(el?.connectedWith === previewUser?.userId) &&
            !(el?.actionUserImgURL === previewProfileData?.imgURL)
              ? el?.actionUserImgURL
              : el?.connectedWith === previewUser?.userId &&
                el?.actionUserImgURL === previewProfileData?.imgURL
              ? el?.connectedUserInfo?.imgURL
              : decodedToken?.imgURL,
          borderWidth: 4,
          size: 20,
        });
        edges.push({
          from: Math.floor(Math.random()) + 1,
          to: Math.floor(Math.random()) + 1,
        });
        x -= 1;
      });
  } else {
    nodes.push({
      id: 1,
      label: "You",
      shape: profileURL ? "circularImage" : "",
      image: profileURL,
      borderWidth: 4,
      size: 20,
    });
    edges.push({
      from: 2,
      to: 3,
    });
    let x = 100000;
    confirmation
      ?.filter(
        (el) =>
          el?.status === "ACCEPTED" &&
          (el?.userId === decodedToken?.userId ||
            el?.connectedWith === decodedToken?.userId) &&
          !el?.deactivated &&
          !el?.deleted
      )
      ?.map((el, index) => {
        nodes.push({
          id: x,
          label: el?.msg?.includes(
            `${decodedToken?.firstName} ${decodedToken?.lastName}`
          )
            ? `${el?.firstName} ${el?.lastName} (ArchiveHub)`
            : `${el?.connectedUserInfo?.firstName} ${el?.connectedUserInfo?.lastName} (ArchiveHub)`,
          shape: profileURL ? "circularImage" : "",
          image: el?.msg?.includes(
            `${decodedToken?.firstName} ${decodedToken?.lastName} `
          )
            ? el?.actionUserImgURL
            : el?.connectedUserInfo?.imgURL,
          borderWidth: 4,
          size: 20,
        });
        edges.push({
          from: x + 1,
          to: x + 1,
        });
        x -= 1;
      });
  }

  const graph = {
    nodes: nodes,
    edges: edges,
  };

  let isFromScholarIndexes = [];

  //logic for limitation to include researchers to the network #1
  data["co-authors"]?.map((el, index) => {
    if (networkColabCount(resultArray, el.name) >= 3) {
      isFromScholarIndexes.push(el.name.split(" ")[-1]);
      nodes.push({
        id: index + 1 + 1,
        label: el.name + ` (${networkColabCount(resultArray, el.name)})`,
        title: el.affiliation,
        link: el.profile_link,
        shape: "circularImage",
        image: el.imgURL,
        borderWidth: 4,
        size: 20,
        // color: {
        //   border: "#222222",
        //   background: "#666666",
        // },
      });
      edges.push({
        from: index + 1 + 1,
        to: 1,
      });
    }
  });

  //logic for limitation to include researchers to the network #2
  resultArray?.map(({ name, count }, index) => {
    if (
      !name.includes(".") &&
      !name.includes(decodedToken.lastName) &&
      count >= 3 &&
      profile !== "preview" &&
      name.length > 2 &&
      !isFromScholarIndexes.includes(name.split(" ")[-1])
    ) {
      nodes.push({
        id: STATIC_NO_1 + index + 1,
        label: name + ` (${count})`,
        title: "From publications",
        link: "https://scholar.google.com/",
        shape: "circularImage",
        image:
          "https://scholar.google.com/citations/images/avatar_scholar_56.png",
        borderWidth: 4,
        size: 20,
        // color: {
        //   border: "#222222",
        //   background: "#666666",
        // },
      });
    } else if (
      !name.includes(".") &&
      !name.includes(previewUser?.lastName?.split(" ")?.pop()) &&
      count >= 3 &&
      profile === "preview" &&
      name.length > 2 &&
      !isFromScholarIndexes.includes(name.split(" ")[-1])
    ) {
      nodes.push({
        id: STATIC_NO_1 + index + 1,
        label: name + ` (${count})`,
        title: "From publications",
        link: "https://scholar.google.com/",
        shape: "circularImage",
        image:
          "https://scholar.google.com/citations/images/avatar_scholar_56.png",
        borderWidth: 4,
        size: 20,
        // color: {
        //   border: "#222222",
        //   background: "#666666",
        // },
      });
    }
    edges.push({
      from: STATIC_NO_1 + index + 1,
      to: 1,
    });
  });

  //user defined collaborators
  [
    ...(profile === "preview" ? collaboratorsPreviewData : collaboratorsData),
  ].map((el, index) => {
    nodes.push({
      id: STATIC_NO_2 + index + 1,
      label: el.collaboratorName + ` (${el.count})`,
      title: "User Defined Collaborator",
      link: el.url,
      shape: "circularImage",
      image: el.photo,
      size: 20,
      // color: {
      //   border: "#222222",
      //   background: "#666666",
      // },
    });
    edges.push({
      from: STATIC_NO_2 + index + 1,
      to: 1,
    });
  });

  const options = {
    layout: {
      hierarchical: false,
      improvedLayout: false,
    },
    edges: {
      color: "orange",
    },
    nodes: {
      color: "lightgreen",
      font: { color: "#eeeeee" },
    },
    height: "300px",
  };

  const events = {
    select: function (event) {
      const { nodes: index, edges } = event;
      if (index[0] === 1)
        notification.info({
          message: "This is your profile",
          placement: "top",
        });
      else
        window.open(
          nodes.filter((el) => el.link)[index?.[0]]?.link ||
            "https://scholar.google.com/",
          "_blank"
        );
    },
  };
  return (
    <div>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
        className="container-sm"
      />
    </div>
  );
};

export default NetworkGraph;
