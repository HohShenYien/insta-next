import { createModal } from "@/utils/modals/constants";
import { ModalInnerProps } from "@/utils/modals/types";
import { ContextModalProps } from "@mantine/modals";
import { Tabs } from "@mantine/core";
import ModalLayout from "./ModalLayout";
import CreatePost from "../posts/CreatePost";
import CreateStory from "../stories/CreateStory";

const CreateModal = ({
  innerProps: {},
}: ContextModalProps<ModalInnerProps[typeof createModal]>) => {
  return (
    <ModalLayout title="Create">
      <Tabs
        defaultValue="post"
        classNames={{ tabsList: "mb-6", tab: "flex-1" }}
      >
        <Tabs.List>
          <Tabs.Tab value="post">Post</Tabs.Tab>
          <Tabs.Tab value="story">Story</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="post">
          <CreatePost />
        </Tabs.Panel>
        <Tabs.Panel value="story">
          <CreateStory />
        </Tabs.Panel>
      </Tabs>
    </ModalLayout>
  );
};

export default CreateModal;
