"use client";

// React
import { useEffect, useState } from "react";

// Chakra UI
import {
  Box,
  Button,
  Card,
  Skeleton,
  Stack,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

// Tabler Icons
import { IconPlus } from "@tabler/icons-react";

// Hooks
import { useFrames } from "@/hooks";

// Components
import CustomBox from "../ui/CustomBox";
import FrameCard from "../ui/FrameCard";
import FormModal from "../ui/FormModal";

export default function Frames() {
  // uses
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getFramesByUserId, createFrame] = useFrames();
  const toast = useToast();

  // hooks
  const { data, status } = getFramesByUserId();
  const { create } = createFrame();

  // states
  const [frames, setFrames] = useState([]);
  const [columns, setColumns] = useState([]);

  const ShowFrames = ({ frames, columns, status }) => {
    if (status === "pending")
      return [...Array(1)].map((_, index) => (
        <Skeleton key={index} width={"250px"} height={"80px"} />
      ));

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

  const CreateNewFrame = () => {
    return (
      <Tooltip label="Adicionar Quadro">
        <Card p={4} width={"190px"} height={"20vh"} variant={"outline"}>
          <Stack justifyContent={"center"} alignItems={"center"} h={"100%"}>
            <Button variant={"ghost"} onClick={onOpen}>
              <IconPlus />
            </Button>
          </Stack>
        </Card>
      </Tooltip>
    );
  };

  const handleCreateFrame = async (formValues) => {
    try {
      const data = await create(formValues);
      onClose();
      toast({
        description: data.message,
        status: data.status,
        variant: "left-accent",
      });
    } catch (error) {
      toast({
        description: "Ocorreu um erro ao criar o quadro.",
        status: "error",
        variant: "left-accent",
      });
    }
  };

  return (
    <Box padding={10}>
      <CustomBox w="100%" h="calc(100vh - 140px)">
        <Stack w={"100%"} spacing={6} direction={"row"} flexWrap={"wrap"}>
          <ShowFrames frames={frames} columns={columns} status={status} />

          <CreateNewFrame />
        </Stack>
      </CustomBox>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Criar Quadro"}
        fields={[{ field: "description", type: "text" }]}
        buttons={[
          {
            label: "Criar",
            color: "blue",
            onClick: (formValues) => {
              handleCreateFrame(formValues);
            },
          },
        ]}
      />
    </Box>
  );
}
