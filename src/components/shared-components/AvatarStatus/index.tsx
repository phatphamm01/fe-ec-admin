import React from "react";
import PropTypes from "prop-types";
import { Avatar, AvatarProps } from "antd";

interface IAvatarStatus {
  name?: string;
  src?: string;
  type?: string;
  onNameClick?: any;
}

const renderAvatar = (props: any) => {
  return (
    <Avatar {...props} className={`ant-avatar-${props.type}`}>
      {props.text}
    </Avatar>
  );
};

export const AvatarStatus: React.FC<any> = (props: any) => {
  const {
    name,
    suffix,
    subTitle,
    id,
    type,
    src,
    icon,
    size,
    shape,
    gap,
    text,
    onNameClick,
  } = props;

  return (
    <div className="avatar-status d-flex align-items-center">
      {renderAvatar({ icon, src, type, size, shape, gap, text })}
      <div className="ml-2">
        <div>
          {onNameClick ? (
            <div
              onClick={() => onNameClick({ name, subTitle, src, id })}
              className="avatar-status-name clickable"
            >
              {name}
            </div>
          ) : (
            <div className="avatar-status-name">{name}</div>
          )}
          <span>{suffix}</span>
        </div>
        <div className="text-muted avatar-status-subtitle">{subTitle}</div>
      </div>
    </div>
  );
};

AvatarStatus.propTypes = {};

export default AvatarStatus;
