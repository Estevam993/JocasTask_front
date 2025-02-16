import { Card, Stack, Text, Tooltip } from "@chakra-ui/react";
import { IconColumns } from "@tabler/icons-react";

export default function FrameCard({ frame, columns }) {
  return (
    <Card p={4} width={"250px"} height={"80px"}>
      <Text textAlign={"center"}>{frame.description}</Text>
      <Tooltip label="Número de colunas"  hasArrow >
        <Stack direction="row" justifyContent={"center"} align="center">
          <IconColumns />
          <Text>{columns?.total}</Text>
        </Stack>
      </Tooltip>
    </Card>
  );
}
