import { Card, Stack, Text, Tooltip } from "@chakra-ui/react";
import { IconColumns } from "@tabler/icons-react";

export default function FrameCard({ frame, columns }) {
  return (
    <Card p={4} width={"190px"} height={"20vh"}>
      <Text textAlign={"center"}>{frame.description}</Text>
      <Tooltip label="Número de colunas"  hasArrow >
        <Stack direction="row" justifyContent={"center"} alignItems={"center"} h={"100%"}>
          <IconColumns />
          <Text>{columns?.total ?? 0}</Text>
        </Stack>
      </Tooltip>
    </Card>
  );
}
