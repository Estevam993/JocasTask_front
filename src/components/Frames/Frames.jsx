"use client";

import { Box, Card, SimpleGrid, useToast } from "@chakra-ui/react";
import CustomBox from "../ui/CustomBox";
import { useFrames } from "@/hooks";
import { useEffect, useState } from "react";
import FrameCard from "../ui/FrameCard";

export default function Frames() {
  const [getFramesByUserId] = useFrames();
  const toast = useToast();

  const { data, status, error } = getFramesByUserId();

  const [frames, setFrames] = useState([]);
  const [columns, setColumns] = useState([]);

  const ShowFrames = ({ frames, columns }) => {
    console.log("colunas: ", columns);
    return frames?.map((frame) => {
      const frameColumns = columns.find((col) => col.frame_id === frame.id);
      return <FrameCard key={frame.id} frame={frame} columns={frameColumns} />;
    });
  };

  useEffect(() => {
    if (status === "success" && data?.frames) {
      setFrames(data.frames);
      setColumns(data.columns);

      toast({
        description: data.message,
        status: data.status,
        variant: "left-accent",
      });
    }
  }, [status, data, toast]);

  return (
    <Box padding={10}>
      <CustomBox w="100%" h="calc(100vh - 140px)">
        <SimpleGrid
          columns={{ base: 1, sm: "auto-fit" }}
          spacing="20px"
          minChildWidth="250px"
          w="100%"
        >
          <ShowFrames frames={frames} columns={columns} />
        </SimpleGrid>
      </CustomBox>
    </Box>
  );
}
