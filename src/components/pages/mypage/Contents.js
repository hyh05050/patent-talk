import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Storage } from "../../../modules/Storage";
import { useAppDispatch } from "../../../store";
import { setAlertModal } from "../../../store/slice/modal";

const Contents = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main>
      <section>
        <div className="container mb-32"></div>
      </section>
    </main>
  );
};

export default Contents;
