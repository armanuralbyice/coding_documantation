package com.alby.student.service.Impl;

import com.alby.student.service.UtilityService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service("utilityService")
@Slf4j
public class UtilityServiceImpl implements UtilityService {
    private final ModelMapper modelMapper;
    @Value("${files.upload.path}")
    private String fileRoot;

    public UtilityServiceImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream().map(element -> modelMapper.map(element, targetClass)).collect(Collectors.toList());
    }

    @Override
    public <S, T> T map(S s, Class<T> targetClass) {
        return modelMapper.map(s, targetClass);
    }

    @Override
    public <S, T> void updateMap(S s, T t) {
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.map(s, t);
    }
    @Override
    public Boolean uploadFile(String location, MultipartFile multipartFile) {
        try {
            byte[] bytes = multipartFile.getBytes();
            File file = new File(location);
            if (!file.exists()) {
                file.mkdirs();
            }
            Path path = Paths.get(location + File.separator + multipartFile.getOriginalFilename());
            log.info("file path: {}{}{}", location, File.separator, multipartFile.getOriginalFilename());
            Files.write(path, bytes);
            return true;
        } catch (Exception e) {
            log.error("Error upload: {}", e.getMessage());
            return false;
        }
    }
    @Override
    public String getDynamicUniqueLocation(String domainName) {
        return fileRoot + File.separator + domainName + File.separator + new SimpleDateFormat("dd-MM-yyyy").format(new Date()) + File.separator + UUID.randomUUID();
    }
}