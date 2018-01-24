package io.rift.service;

import io.rift.model.RifterGame;
import io.rift.repository.RifterGameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RifterGameService {

    @Autowired
    private RifterGameRepository rifterGameRepository;

    public RifterGame getRifterGameById(Integer id) {
        return rifterGameRepository.getRifterGameById(id);
    }


}
