package io.rift.repository;

import io.rift.model.Usertable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface UsertableRepository extends JpaRepository<Usertable, Integer> {

    Usertable findById(Integer id);

    Usertable findByFirstName(String firstName);

}
