import { useEffect, useRef, useState } from "react";

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
import { IconHomeFilled, IconMenu2, IconLayoutKanbanFilled } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/http";

export default function Menu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const fetchCookie = async () => {
      const cookieValue = await getCookie("jwt");
      setJwt(cookieValue);
    };

    fetchCookie();
  }, []);

  const redirect = () => {
    if (jwt) router.push("/frames");
    else router.push("/");
  }

  const MenuIcon = ({}) => {
    if (jwt) return <IconLayoutKanbanFilled />
    return <IconHomeFilled />
  }

  return (
    <>
      <Button ref={btnRef} variant={"ghost"} onClick={onOpen}>
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
              <Button onClick={redirect} variant={"ghost"}>
                <MenuIcon />
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
