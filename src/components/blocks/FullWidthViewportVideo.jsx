import React, { useEffect, useRef } from "react";
import {
  useGlobalVideoSound,
  enableGlobalVideoSound,
  disableGlobalVideoSound,
} from "../../hooks/useGlobalVideoSound";
import { ymGoal, ymNotBounce } from "../../utils/metrika";

/**
 * FullWidthViewportVideo — видео-блок на всю ширину экрана
 * с автоматическим воспроизведением в зоне видимости и
 * общим управлением звуком (Instagram-подобное поведение).
 */
const FullWidthViewportVideo = ({
  videoSrc,
  sources = [],
  aspectRatio = "4 / 5",
  containerStyle = {},
  videoStyle = {},
  videoProps = {},
  autoPlayInView = true,
  autoPlayThreshold = 0.5,
  showSoundToggle = true,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const userUnmutedRef = useRef(false);
  const soundInteractionTrackedRef = useRef(false);
  const [soundEnabled] = useGlobalVideoSound();

  const trackSoundInteraction = () => {
    ymNotBounce();
    if (soundInteractionTrackedRef.current) return;
    soundInteractionTrackedRef.current = true;
    ymGoal("video_sound_on");
  };

  // Автовоспроизведение при попадании в зону видимости
  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;
    if (!videoEl || !containerEl || !autoPlayInView) return;

    let observer;

    const handleIntersection = async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          try {
            videoEl.muted = true;
            await videoEl.play();
            if (userUnmutedRef.current) {
              videoEl.muted = false;
              videoEl.volume = 1;
            }
          } catch (_) {}
        } else {
          videoEl.pause();
        }
      }
    };

    observer = new IntersectionObserver(handleIntersection, {
      threshold: autoPlayThreshold,
    });

    observer.observe(containerEl);
    return () => observer && observer.disconnect();
  }, [autoPlayInView, autoPlayThreshold]);

  // Синхронизация с глобальным состоянием звука
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (soundEnabled && userUnmutedRef.current) {
      videoEl.muted = false;
      videoEl.volume = 1;
    } else {
      videoEl.muted = true;
    }
  }, [soundEnabled]);

  // Отслеживание ручного изменения громкости
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;
    const onVolumeChange = () => {
      const isUnmuted = !videoEl.muted && videoEl.volume > 0;
      userUnmutedRef.current = isUnmuted;
      if (isUnmuted) {
        enableGlobalVideoSound();
        trackSoundInteraction();
      } else {
        disableGlobalVideoSound();
      }
    };

    videoEl.addEventListener("volumechange", onVolumeChange);
    return () => videoEl.removeEventListener("volumechange", onVolumeChange);
  }, []);

  const handleVideoClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
    }

    enableGlobalVideoSound();
    trackSoundInteraction();
    const videoEl = videoRef.current;
    if (!videoEl) return;

    userUnmutedRef.current = true;
    videoEl.muted = false;
    videoEl.volume = 1;
    videoEl.play().catch(() => {});
  };

  const handleSoundToggle = (event) => {
    event.stopPropagation();
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (soundEnabled && userUnmutedRef.current) {
      userUnmutedRef.current = false;
      videoEl.muted = true;
      disableGlobalVideoSound();
    } else {
      enableGlobalVideoSound();
      trackSoundInteraction();
      userUnmutedRef.current = true;
      videoEl.muted = false;
      videoEl.volume = 1;
      videoEl.play().catch(() => {});
    }
  };

  const mergedContainerStyle = {
    width: "100%",
    overflow: "hidden",
    aspectRatio,
    position: "relative",
    ...containerStyle,
  };

  const mergedVideoStyle = {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    display: "block",
    objectFit: "cover",
    objectPosition: "center center",
    ...videoStyle,
  };

  const {
    loop = true,
    controls = true,
    preload = "metadata",
    playsInline = true,
    muted,
    onClick,
    ...restVideoProps
  } = videoProps;

  // Источники по умолчанию
  const derivedSources =
    sources.length > 0
      ? sources
      : videoSrc
      ? [{ src: videoSrc, type: "video/mp4" }]
      : [];

  return (
    <div ref={containerRef} style={mergedContainerStyle}>
      {showSoundToggle && (
        <button
          aria-label={
            soundEnabled && userUnmutedRef.current
              ? "Выключить звук видео"
              : "Включить звук видео"
          }
          onClick={handleSoundToggle}
          onFocus={(e) => e.currentTarget.blur()}
          tabIndex={-1}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 5,
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
            backdropFilter: "blur(3px)",
            outline: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {soundEnabled && userUnmutedRef.current ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15 9a5 5 0 0 1 0 6" />
              <path d="M17.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          )}
        </button>
      )}

      <video
        ref={videoRef}
        src={videoSrc}
        loop={loop}
        controls={controls}
        preload={preload}
        playsInline={playsInline}
        style={mergedVideoStyle}
        onClick={handleVideoClick}
        muted={muted}
        {...restVideoProps}
      >
        {derivedSources.map(({ src, type }, index) => (
          <source key={`${src}-${type || index}`} src={src} type={type} />
        ))}
        Ваш браузер не поддерживает видео.
      </video>
    </div>
  );
};

export default FullWidthViewportVideo;
