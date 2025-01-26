import { useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import ColorModeToggle from "@/util/ColorToggleMode";
import { Divider } from "@chakra-ui/react";
import { IconHomeFilled, IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  return (
    <>
      <Button ref={btnRef} variant={'ghost'} onClick={onOpen}>
        <IconMenu2 />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack direction={"row"} spacing={2}>
              <ColorModeToggle />
              <Button onClick={() => router.push("/")} variant={'ghost'}>
                <IconHomeFilled />
              </Button>
            </Stack>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            <Stack direction="row" h="100%">
              <Divider orientation="vertical" />
              <Text>a</Text>
            </Stack>
          </DrawerBody>

          {/* <DrawerFooter>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}
